import {Component} from '@angular/core';
import {Category, CategoryItem, Difficulty, Question} from '../data.models';
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

  constructor(protected quizService: QuizService) {
    this.categories$ = quizService.getAllCategories();
  }

  createQuiz(difficulty: string): void {
    const cat: string= this.selectedSubcategory ? `${this.selectedSubcategory?.id}` : `${this.selectedCategory?.id}`
    this.questions$ = this.quizService.createQuiz(cat, difficulty as Difficulty);
  }

  onCategoryChange(): void {
    if (this.selectedCategory) {
      this.subcategories = this.selectedCategory.subcategories;
    } else {
      this.subcategories = [];
    }
  }

}
