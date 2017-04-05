
import {LoginService} from "../service/login.service";
import {Location} from "@angular/common";
import {CommonComponent} from "./common.component";

export class DataTablesComponent extends CommonComponent {

    dtOptions: DataTables.Settings = {};

    constructor(loginService: LoginService, location: Location) {
        super(loginService, location)
        this.setDataTablesOption();
    }

    private setDataTablesOption() {
        this.dtOptions = {
            paging: true,
            searching: false,
            order: [[ 0, "desc" ]],
            language:
            {
                "emptyTable":      "Keine Daten in der Tabelle vorhanden",
                "info":            "_START_ bis _END_ von _TOTAL_ Einträgen",
                "infoEmpty":       "0 bis 0 von 0 Einträgen",
                "infoFiltered":    "(gefiltert von _MAX_ Einträgen)",
                "infoPostFix":     "",
                "lengthMenu":      "_MENU_ Einträge anzeigen",
                "loadingRecords":  "Wird geladen...",
                "processing":      "Bitte warten...",
                "search":          "Suchen",
                "zeroRecords":     "Keine Einträge vorhanden.",
                "paginate": {
                    "first":       "Erste",
                    "previous":    "Zurück",
                    "next":        "Nächste",
                    "last":        "Letzte"
                },
                "aria": {
                    "sortAscending":  ": aktivieren, um Spalte aufsteigend zu sortieren",
                    "sortDescending": ": aktivieren, um Spalte absteigend zu sortieren"
                }
            }
        }
    }
}