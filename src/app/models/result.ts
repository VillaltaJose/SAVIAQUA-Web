export interface Result<T> {
	success: boolean;
	messages: Message[];
	value: T;
}

export interface Message {
	code?: string;
	text: string;
}

export interface BasePaginationFilter {
	pageSize?: number;
	pageNumber?: number;
}