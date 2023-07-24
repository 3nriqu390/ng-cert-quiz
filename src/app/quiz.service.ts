import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Category, Difficulty, ApiQuestion, Question, Results, CategoryResponse} from './data.models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private API_URL = "https://opentdb.com/";
  private latestResults!: Results;

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<CategoryResponse>(this.API_URL + "api_category.php").pipe(
      map((response: CategoryResponse) => {
        const categoriesMap = new Map<string, Category>();
  
        response.trivia_categories.forEach((categoryObj) => {
          const [category, subcategory] = categoryObj.name.split(":").map((str) => str.trim());
           
          if (categoriesMap.has(category)) {
            const existingCategory = categoriesMap.get(category);
            if (existingCategory) {
              existingCategory.subcategories.push({name:subcategory, id: Number(categoryObj.id)});
            }
          } else {
            categoriesMap.set(category, {
              id: categoryObj.id,
              category,
              subcategories: subcategory ? [{name:subcategory, id: Number(categoryObj.id)}] : [],
            });
          }
        });
  
        return Array.from(categoriesMap.values());
      })
    );
  }
  

  createQuiz(categoryId: string, difficulty: Difficulty,amount:number = 5): Observable<Question[]> {
    return this.http.get<{ results: ApiQuestion[] }>(
        `${this.API_URL}/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty.toLowerCase()}&type=multiple`)
      .pipe(
        map(res => {
          const quiz: Question[] = res.results.map(q => (
            {...q, all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => (Math.random() > 0.5) ? 1 : -1)}
          ));
          return quiz;
        })
      );
  }

  computeScore(questions: Question[], answers: string[]): void {
    let score = 0;
    questions.forEach((q, index) => {
      if (q.correct_answer == answers[index])
        score++;
    })
    this.latestResults = {questions, answers, score};
  }

  getLatestResults(): Results {
    return this.latestResults;
  }
}
