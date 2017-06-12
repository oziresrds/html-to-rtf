import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  public stackOfStyles: any = ['<b>test668</b>','<i>test</i>'];
  postTitle: string = 'test668';
//   @ViewChild('testInput') campoValorInput: ElementRef;

  public getTextArea(value) {
     
   //   console.log(document.getElementById('test1').innerText);
   //   console.log(document.getElementById('test1').innerHTML);
  }

  public test() {
   //   console.log('campoValorInput', this.campoValorInput.nativeElement.innerHTML);
  }

  bold() {
   //   console.log('bold clicked');
   //   console.log(document.querySelector(".textarea").attributes);
     

  }
}
