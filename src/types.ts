/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PersonalDetails {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  photoUrl?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  graduationDate: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  link: string;
  technologies: string[];
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: string; // e.g. Beginner, Intermediate, Expert
}

export interface Resume {
  personal: PersonalDetails;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
}

export type SectionType = 'personal' | 'experience' | 'education' | 'skills' | 'projects';
