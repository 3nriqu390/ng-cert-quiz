import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit{
  @Input() options?: any[] | null = [];
  @Input() filterAttribute: string = ''; // Attribute to use for filtering
  selectedOption: any | undefined;
  showDropdown: boolean = false;
  filteredOptions?: any[] | null = [];
  searchText: string = '';
  @Output()
  selected = new EventEmitter<any>()

  ngOnInit(): void {
    this.filteredOptions = this.options;
  }

  onOptionSelect(event: Event, option: any): void {
    event.stopPropagation();
    this.selectedOption = option;
    this.showDropdown = false;
    this.selected.emit(option);
    this.searchText = option[this.filterAttribute]
  }

  showOptions(): void {
    this.showDropdown = true;
    if(!this.filteredOptions){
      this.filteredOptions = this.options
    }
  }

  hideOptions(): void {
    this.showDropdown = false;
  }

  filterOptions(event: any): void {
    const searchText: string = event.value;
    if (!searchText || searchText.trim() === '') {
        this.filteredOptions = this.options ?? [];
    } else {
        this.filteredOptions = this.options?.filter((option) => {
            const matchIndex = option[this.filterAttribute].toLowerCase().indexOf(searchText.toLowerCase());
            return matchIndex !== -1;
        }).map((option) => {
            const regex = new RegExp(searchText, 'gi');
            const formattedOption = option[this.filterAttribute].replace(regex, (matched:string) => `<strong>${matched}</strong>`);
            return { ...option, formattedName: formattedOption };
        }) ?? [];
    }
  }


}
