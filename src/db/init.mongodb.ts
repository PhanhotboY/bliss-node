import os from 'os';
import mongoose from 'mongoose';

import { mongodbConfig } from '../configs/config.mongodb';
import { InternalServerError } from '../api/core/errors';

const { dbHost, dbName, dbPort, dbUser, dbPwd, dbAppName } = mongodbConfig;

//Using Singleton pattern to init mongodb
class MongoDB {
  static instance: MongoDB;
  retryCount: number = 0;
  maxRetries: number = 10;
  isConnecting: boolean = false;

  constructor() {
    this.handleConnectionEvent();
  }

  async connect(type?: string) {
    if (this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    console.log('Retrying to connect to MongoDB...', this.retryCount);
    this.retryCount++;

    let connectionStr: string;
    const env = process.env.NODE_ENV as string;

    if (env === 'production') {
      connectionStr = `mongodb+srv://${dbUser}:${dbPwd}@${dbHost}?retryWrites=true&w=majority&appName=${dbAppName}`;
    } else {
      connectionStr = `mongodb://${dbUser}:${dbPwd}@${dbHost}:${dbPort}`;
    }

    try {
      await mongoose.connect(connectionStr, {
        connectTimeoutMS: 1000,
        serverSelectionTimeoutMS: 2000,
        dbName,
      });
      this.isConnecting = false;
    } catch (error) {
      this.isConnecting = false;
      console.error('MongoDB connection failed:', error);

      // Only retry if we haven't exceeded max attempts
      if (this.retryCount < this.maxRetries) {
        const delay = Math.min(1000 * Math.pow(1.5, this.retryCount), 30000);
        console.log(`Will retry in ${delay}ms...`);
        setTimeout(() => this.connect(type), delay);
      } else {
        console.error(`Max retries (${this.maxRetries}) reached. Giving up.`);
        throw new InternalServerError('Error connecting to MongoDB');
      }
    }
  }

  async disconnect(type?: string) {
    await mongoose.disconnect().finally(() => {
      console.log('MongoDB disconnected');
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MongoDB();
    }

    return this.instance;
  }

  handleConnectionEvent() {
    mongoose.connection.on('error', async (e) => {
      console.log('MongoDB connection error');
      if (this.retryCount > this.maxRetries) {
        throw new InternalServerError('Error connecting to MongoDB' + e);
      }

      if (!this.isConnecting) {
        await this.connect('mongodb');
      }
    });

    mongoose.connection.on('connecting', () => {
      console.log('Connecting to MongoDB...');
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected');
      this.retryCount = 0;
      this.logStatus();
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      if (this.retryCount < this.maxRetries && !this.isConnecting) {
        this.connect('mongodb').catch((err) =>
          console.error('Failed to reconnect:', err)
        );
      }
    });

    mongoose.connection.on('close', () => {
      console.log('MongoDB connection closed');
      this.retryCount = 0;
    });
  }

  logStatus() {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const mem = process.memoryUsage().rss;
    const maxConnection = numCores * 5;

    if (numConnections >= maxConnection) {
      console.log('Connection overload detected!');
    }

    console.log('Active connections::::', numConnections);
    console.log('Memory usage::::', mem / 1024 / 1024, 'MB');
  }
}

export const mongodbInstance = MongoDB.getInstance();
