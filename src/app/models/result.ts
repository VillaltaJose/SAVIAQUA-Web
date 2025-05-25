export interface Metadata {
	totalCount: number;
	pageSize: number;
	currentPage: number;
	totalPages: number;
	hasPreviousPage?: boolean;
	hasNextPage?: boolean;
}

export interface Result<T> {
	success: boolean;
	messages: Message[];
	value: T;
	metadata?: Metadata;
}

export interface Message {
	code?: string;
	text: string;
}

export interface BasePaginationFilter {
	pageSize?: number;
	pageNumber?: number;
}

export interface PaginatedFilter {
	pageSize: number;
	pageNumber: number;
}
