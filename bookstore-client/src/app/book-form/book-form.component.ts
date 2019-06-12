import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BookService } from '../service/book-service.service';
import { Book } from '../model/book';
import { throwError } from 'rxjs';

@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.css']
})

export class BookFormComponent {

    addBookForm: FormGroup;
    loading = false;
    submitted = false;

    book: Book;

    constructor(private formBuilder: FormBuilder, private router: Router, private bookService: BookService) {
        this.book = new Book();
    }

    ngOnInit() {
        this.addBookForm = this.formBuilder.group({
            title: ['', Validators.required],
            author: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.addBookForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.addBookForm.invalid) {
            return;
        }

        this.book.author = this.f.author.value;
        this.book.title = this.f.title.value;

        // Save newly created book
        this.loading = true;
        this.bookService.save(this.book)
            .pipe(first())
            .subscribe(
                data => {
                    this.gotoBookList();
                },
                error => {
                    this.loading = false;
                    throwError(error);
                });
    }

    gotoBookList() {
        this.router.navigate(['/books']);
    }

}
