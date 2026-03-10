import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';

declare var data : any;

@Component({
    selector: 'app-quote',
    templateUrl: './quote.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./quote.component.css'],
    standalone: false
})
export class QuoteComponent implements OnInit, OnDestroy {
    private quotes = data['Quote'];
    private currentIndex = 0;
    public quoteData = this.quotes[0];
    public isVisible = true;
    private interval: any;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        changeDetectorRef.detach();
    }

    ngOnInit(): void {
        this.changeDetectorRef.detectChanges();
        this.interval = setInterval(() => {
            this.isVisible = false;
            this.changeDetectorRef.detectChanges();
            setTimeout(() => {
                this.currentIndex = (this.currentIndex + 1) % this.quotes.length;
                this.quoteData = this.quotes[this.currentIndex];
                this.isVisible = true;
                this.changeDetectorRef.detectChanges();
            }, 600);
        }, 7000);
    }

    ngOnDestroy(): void {
        if (this.interval) clearInterval(this.interval);
    }
}
