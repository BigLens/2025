import { Injectable } from '@nestjs/common';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
     books(bookDto: BookDto) {
        console.log('Type of year: ', typeof bookDto.year)
        return {message: 'Book retrieved successfully', bookDto};
    }
}