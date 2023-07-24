import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Difficulty, Question} from '../data.models';
import {QuizService} from '../quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  @Input()
  questions: Question[] | null = [];
  @Input()
  categoryId?:string;
  @Input()
  difficulty?:string;
  
  userAnswers: string[] = [];
  quizService = inject(QuizService);
  router = inject(Router);
  @Input()
  questionChanged = false

  submit(): void {
    this.quizService.computeScore(this.questions ?? [], this.userAnswers);
    this.router.navigateByUrl("/result");
  }

  newQuestionRequested(index: number){
    this.questionChanged = true
    this.quizService.createQuiz(this.categoryId as string , this.difficulty as Difficulty, 1).subscribe((question) => {
      if(this.questions && this.questions[index]){
        this.questions[index] = question[0]
      }
    })

  }
}
