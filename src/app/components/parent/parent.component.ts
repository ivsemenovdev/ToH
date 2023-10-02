import {ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ConvertService} from "../../services/convert.service";

interface Item {
  id: number,
  value: string
}

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent implements OnInit{

  streamValue: number[] = []
  obj: Item = {"id": 0, "value": ''};
  res: Array<Item> = [];

  constructor(private dataService: DataService, private convertService: ConvertService) {
  }

  ngOnInit() {
    this.streamValue = this.dataService.streamValue;
    this.convertArrayToArrayOfObject(this.streamValue);
  }

  pushData(val: number) {
    this.dataService.updateSubjectData = val;
    this.streamValue = this.dataService.streamValue;
    this.convertArrayToArrayOfObject(this.streamValue);
  }

  getValue() {
    return this.res
  }

  convertArrayToArrayOfObject(arr: Array<number>) {
    if (this.res.length === 0) {
      for (let i = 0; i < arr.length; i++) {
        this.obj = {"id": 0, "value": ''}
        this.obj.id = arr[i];
        this.obj.value = this.convertService.getRandomChar();
        this.res.push(this.obj);
      }
    } else {
      this.obj = {"id": 0, "value": ''}
      this.obj.id = arr[arr.length - 1];
      this.obj.value = this.convertService.getRandomChar();
      this.res.push(this.obj);
    }
  }

  clickHandler(elValue: string) {
    console.log(elValue);
  }

  addElement() {
    if (this.res.length === 0) {
      this.pushData(0);
    } else {
      console.log(this.res[this.res.length - 1].id + 1)
      this.pushData(this.res[this.res.length - 1].id + 1)
    }
  }

  identify(i: number)  {
    return i;
  }

}
