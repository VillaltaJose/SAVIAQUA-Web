import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
	selector: '[infinite-scroll]',
	standalone: true,
})
export class InfiniteScrollDirective {
	@Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();
	@Input() threshold = 120;

	lastHeight = -1;

	constructor(
		private el: ElementRef,
	) {}

	@HostListener('scroll', ['$event.target'])
	windowScrollEvent(event: KeyboardEvent) {
		const heightOfElement = this.el.nativeElement.scrollTopMax;
		const currentScrolledY = this.el.nativeElement.scrollTop;
		const scrollToBottom = heightOfElement - currentScrolledY;

		if (this.lastHeight === heightOfElement) return;

		if (scrollToBottom < this.threshold) {
			this.nearEnd.emit();
			this.lastHeight = heightOfElement;
		}
	}
}
