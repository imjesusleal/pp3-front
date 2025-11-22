import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IonicModule, IonInput } from "@ionic/angular";
import { CoreFormGroup } from "./interfaces/core-form-group.interface";
import { CommonModule } from "@angular/common";
import { Config } from '@ionic/angular';

@Component({
    selector: 'lib-core-form',
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule, CommonModule],
    templateUrl: './core-form.component.html',
})
export class CoreForm implements OnChanges {
    @Input() customFormGroup: CoreFormGroup = { controls: [] };

    fg!: FormGroup;

    @ViewChild('text', { static: false }) textTpl!: TemplateRef<any>;
    @ViewChild('number', { static: false }) numberTpl!: TemplateRef<any>;
    @ViewChild('email', { static: false }) emailTpl!: TemplateRef<any>;


    constructor(private cdr: ChangeDetectorRef, private config: Config) {
        console.log('Modo actual:', this.config.get('mode')); // "md" o "ios"
    }
    ngOnChanges(changes: SimpleChanges): void {
        const newGroup = changes['customFormGroup']?.currentValue as CoreFormGroup;

        if (newGroup?.controls) {
            const group: Record<string, FormControl> = {};

            newGroup.controls.forEach(field => {
                group[field.controlName] = new FormControl(field.value ?? '');
            });

            this.fg = new FormGroup(group);

            this.cdr.detectChanges();
        }
    }

    // ngOnInit(): void {
    //     console.log(this.customFormGroup, 'desde el init');

    //     const group: Record<string, FormControl> = {};

    //     this.customFormGroup.controls.forEach(field => {
    //         group[field.controlName] = new FormControl(field.value ?? '');
    //     });

    //     this.fg = new FormGroup(group);
    // }


    getTemplate(type: string): TemplateRef<any> {
        switch (type) {
            case 'number':
                return this.numberTpl;
            case 'email':
                return this.emailTpl;
            default:
                return this.textTpl;
        }
    }

}