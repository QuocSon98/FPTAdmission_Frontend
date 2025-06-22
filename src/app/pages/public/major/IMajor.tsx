import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface MajorQuality {
    icon: IconDefinition;
    title: string;
    description?: string;
}

export interface MajorCareer {
    position: string;
    role: string;
}

export interface MajorData {
    id: string;
    name: string;
    bannerImage: string;
    description: string;
    overview?: string;
    careers: MajorCareer[];
    qualities: MajorQuality[];
    learningPath?: string[];
}