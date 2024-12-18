import { WebSocketStatus } from "@/helper/enums";

export interface Topic {
    id: number;
    documentId: string;
    Name: string;
  }
  
  export interface Section {
    id: number;
    documentId: string;
    Name: string;
    topics: Topic[];
  }
  
  export interface Industry {
    id: number;
    documentId: string;
    Name: string;
    sections: Section[];
  }
  
  export interface Answer {
    id: number;
    content: string;
  }
  
  export interface QuestionLevel {
    id: number;
    level_name: string;
  }
  
  export interface Question {
    id: number;
    Content: string;
    answers: Answer[];
    question_level: QuestionLevel;
    readStatus:boolean;
    statusId:string
    }
  
  export interface HomeProps {
    initialIndustries: Industry[];
  }
  
  export interface SectionContentProps {
    selectedSection: number;
    filteredQaList: Question[];
    topicName:string ;
  }

  export interface WebSocketData {
    message: string; // Type of the progress message
    status: WebSocketStatus
  }
