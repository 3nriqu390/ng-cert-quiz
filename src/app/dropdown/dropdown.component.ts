import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryType } from '../data.models';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit{
  @Input() options?: CategoryType[] | null = [];
  @Input() filterAttribute: string = '';
  selectedOption: CategoryType | undefined;
  showDropdown: boolean = false;
  filteredOptions?: CategoryType[] | null = [];
  searchText?: string = '';
  @Output()
  selected = new EventEmitter<CategoryType>()

  ngOnInit(): void {
    this.filteredOptions = this.options;
  }

  onOptionSelect(event: Event, option: CategoryType): void {
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

  filterOptions(): void {
    console.log('Search text',this.searchText)
    if (!this.searchText || this.searchText.trim() === '') {
        this.filteredOptions = this.options ?? [];
    } else {
        this.filteredOptions = this.options?.filter((option) => {
            const matchIndex = option[this.filterAttribute].toLowerCase().indexOf(this.searchText?.toLowerCase());
            return matchIndex !== -1;
        }).map((option) => {
            const regex = new RegExp(this.searchText as string, 'gi');
            const formattedOption = option[this.filterAttribute].replace(regex, (matched:string) => `<strong>${matched}</strong>`);
            return { ...option, formattedName: formattedOption };
        }) ?? [];
    }
  }


}
