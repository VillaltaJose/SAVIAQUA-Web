import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
	template: ''
})
export class CommonSelect<T> implements ControlValueAccessor {

	@Input('placeholder') placeholder: string = "Seleccione una opción";
	@Input('disabled') isDisabled: boolean = false;
	@Input('readonly') isReadonly: boolean = false;
	@Input('ngModel') value: T | null = null;
	@Output('ngModelChange') emitter: EventEmitter<T> = new EventEmitter<T>();

	onChange = (value: T) => {};
	onTouch = () => {}

	inputText: string = "";

	constructor() { }

	change(value: T) {
		if(this.isReadonly || this.isDisabled) {
			return;
		}

		this.value = value;
		this.emitter.emit(value);
		this.changeCallback();
		this.onChange(value);
	}

	changeCallback() {}

	writeValue(obj: any): void {
		if(obj == null) {
			this.value = obj;
			this.emitter.emit(obj);
			this.inputText = obj;
		} else {
			try {
				this.change(obj);
			}
			catch {}
		}
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled
	}
}
