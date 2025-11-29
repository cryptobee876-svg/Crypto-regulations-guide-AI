import React from 'react';

export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface GroundingSource {
  title?: string;
  uri?: string;
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isTyping?: boolean;
  sources?: GroundingSource[];
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}