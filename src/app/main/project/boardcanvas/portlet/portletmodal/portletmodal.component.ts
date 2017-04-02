import { Component, ViewEncapsulation, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({

  selector: 'chore-portlet-modal',
  templateUrl: './portletmodal.component.html'
})
export class PortletModalComponent implements OnInit {

  @Input() card: any;



  private viewLabel: Boolean = true;
  private addDescription: Boolean = false;
  private editLabelForm;
  private ckeditorContent;
  private config;

  constructor(private modalService: NgbModal, public fb: FormBuilder) {
    /**
     * CKEditor ngmodel value default;
     */
    this.ckeditorContent = `<p>My HTML</p>`;

    /**
     * CKEditor Configuration
     */
    this.config = {
      toolbar: [
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Strike'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
        { name: 'links', items: ['Link', 'Unlink'] },
        // { name: 'editing', groups: ['spellchecker'], items: ['Scayt'] },
        // { name: 'styles', items: ['Styles', 'Format'] },
        // { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
        { name: 'tools', items: ['Maximize'] },
      ]
    }

  }

  ngOnInit() {

  }

  /**
   * Modal label Edit function
   */
  editLabel() {
    this.viewLabel = false;
    this.editLabelForm = this.fb.group({
      cardlabel: [this.card.portletCardName, Validators.required]
    });
  }

  /**
   * Modal label save function
   */
  editDoneLabel() {
    this.viewLabel = true;
  }

  /**
   * CKEditor value get
   */
  getValue() {
    console.log(this.ckeditorContent);
  }

  /**
   * show Hide CKEditor
   */
  showCKEditor() {
    this.addDescription = !this.addDescription;
  }
}