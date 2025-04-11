import { Body, Controller, Post, Query, UsePipes, ValidationPipe, Get, Param } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService) {}

    @Post()
    @UsePipes(new ValidationPipe({whitelist: true}))
    theBooks(@Body() bookDto: BookDto) {
        return this.bookService.books(bookDto)
    }

    @Get(':id')
    getbookbyid(@Param('id') id: string) {
        return `book returned with id ${id}`
    }

    @Get()
    getbookbbyid(@Query('id') id: string) {
        return `book returned with id ${id}`
    }
}