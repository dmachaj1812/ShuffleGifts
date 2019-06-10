import { Comment } from './../_models/comment';
import { AuthService } from './../_services/auth.service';
import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit, Input,OnDestroy } from '@angular/core';
import { CommentService } from '../_services/comment.service';


@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit, OnDestroy {
  @Input() eventId: number;
  currentUserId: number;
  listOfCommnets: any;
  comment: string;
  addCommentDto = {} as any;
  commentSub: any;

  constructor(private commentService: CommentService, private alertify: AlertifyService, private authService: AuthService) { }

  ngOnInit() {
    this.currentUserId = this.authService.decoded().nameid;
    this.commentService.getAllComment(this.eventId).subscribe(next => {
      this.listOfCommnets = next;
    });
  }

  addCommnet() {
    this.addCommentDto.commentText = this.comment;
    this.addCommentDto.eventId = this.eventId;
    this.addCommentDto.userId = this.currentUserId;

   this.commentSub = this.commentService.addCommment(this.addCommentDto).subscribe(next => {
      this.listOfCommnets.push(next);
    }, error => {
      this.alertify.errorRetrievingData();
    });

    this.comment = '';

  }

  ngOnDestroy() {
   /* Fix me to unsubscrive if comment added

     this.commentSub.unsubsribe(); */
  }

}
