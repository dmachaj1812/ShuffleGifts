import { CommentService } from './../../../_services/comment.service';
import { Comment } from './../../../_models/comment';
import { AuthService } from './../../../_services/auth.service';
import { AlertifyService } from './../../../_services/alertify.service';
import { Component, OnInit, Input,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-event-chat',
  templateUrl: './event-chat.component.html',
  styleUrls: ['./event-chat.component.css']
})
export class EventChatComponent implements OnInit {
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
}
