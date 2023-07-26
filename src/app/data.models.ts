interface BaseCategory {
  [key: string]: any;
}
export interface Category extends BaseCategory {
  id: number;
  category: string;
  subcategories: CategoryItem[];
}

export interface CategoryResponse {
  trivia_categories: CategoryItem[];
}

export interface CategoryItem extends BaseCategory{
  name:string;
  id:number
}

export type CategoryType = Category | CategoryItem

export interface ApiQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
}

export interface Results {
  questions: Question[];
  answers: string[];
  score: number;
}


export type Difficulty = "Easy" | "Medium" | "Hard";
