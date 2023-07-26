import {Component} from '@angular/core';
import {Category, CategoryItem, CategoryType, Difficulty, Question} from '../data.models';
import {Observable} from 'rxjs';
import {QuizService} from '../quiz.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent {
  categories$: Observable<Category[]>;
  questions$!: Observable<Question[]>;
  subcategories: CategoryItem[] = [];
  selectedCategory: Category | null = null;
  selectedSubcategory: CategoryItem | null =null;
  categoryId: string = ''
  newQuizCreated = false
  
  constructor(protected quizService: QuizService) {
    this.categories$ = quizService.getAllCategories();
  }

  createQuiz(difficulty: string): void {
    this.categoryId= this.selectedSubcategory ? `${this.selectedSubcategory?.id}` : `${this.selectedCategory?.id}`
    this.questions$ = this.quizService.createQuiz(this.categoryId, difficulty as Difficulty);
    this.newQuizCreated = true;
  }

  onCategoryChange(category:CategoryType): void {
    this.subcategories = category.subcategories;
    this.selectedCategory = category as Category;
  }

  onSubcategoryChange(subcategory:CategoryType){
    this.selectedSubcategory = subcategory as CategoryItem
  }
}
