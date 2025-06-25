import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { Bet } from "../../apuestas/models/bets.model";


@Component({
    selector: 'app-bet-details-dialog',
    templateUrl: './bet-details-dialog.component.html',
    styleUrls: ['./bet-details-dialog.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatTableModule,
        MatDialogModule
    ]
})

export class BetDetailsDialogComponent {
  columns: string[] = ['teams', 'league', 'date', 'forecast', 'status'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { bet: Bet }) {}
}
