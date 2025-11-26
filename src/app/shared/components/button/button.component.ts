import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: false
})
export class ButtonComponent {
  @Input() color: string | undefined = 'primary';
  @Input() expand: 'block' | 'full' | undefined = 'block';
  @Input() fill: 'solid' | 'outline' | 'clear' = 'solid';
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() loading = false;

  @Output() pressed = new EventEmitter<Event>();

  handleClick(event: Event): void {
    if (this.loading || this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.pressed.emit(event);
  }
}
