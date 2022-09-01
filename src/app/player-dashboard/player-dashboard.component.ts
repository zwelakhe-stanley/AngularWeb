import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { PlayerModel } from '../player-dashboard.model';

@Component({
  selector: 'app-player-dashboard',
  templateUrl: './player-dashboard.component.html',
  styleUrls: ['./player-dashboard.component.css']
})
export class PlayerDashboardComponent implements OnInit {

  formValue !: FormGroup;
  playerModelObj : PlayerModel = new PlayerModel();

  playerData!: any;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {

    this.formValue = this.fb.group({
      firstName:[''],
      lastName: [''],
      nationality: [''],
      club: [''],
      position: [''],
      value: ['']
    })
    this.getAllPlayers();
  }

  postPlayerDetails(){
    this.playerModelObj.id = this.formValue.value.id;
    this.playerModelObj.firstName = this.formValue.value.firstName;
    this.playerModelObj.lastName = this.formValue.value.lastName;
    this.playerModelObj.nationality = this.formValue.value.nationality;
    this.playerModelObj.club = this.formValue.value.club;
    this.playerModelObj.position = this.formValue.value.position;
    this.playerModelObj.value = this.formValue.value.value;

    this.api.postPlayer(this.playerModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Player added successfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllPlayers();
    })
  }

  getAllPlayers(){
    this.api.getPlayer(this.playerModelObj)
    .subscribe(res=>{
      this.playerData = res;
    })
  }

  deletePlayer(playerVal: any) {
    this.api.deletePlayer(playerVal.id)
    .subscribe(res=>{
      alert("Player deleted!")
      this.getAllPlayers();
    })
  }

  onEdit(playerVal:any){
    this.playerModelObj.id = playerVal.id
    this.formValue.controls['firstName'].setValue(playerVal.firstName);
    this.formValue.controls['lastName'].setValue(playerVal.lastName);
    this.formValue.controls['nationality'].setValue(playerVal.nationality);
    this.formValue.controls['club'].setValue(playerVal.club);
    this.formValue.controls['position'].setValue(playerVal.position);
    this.formValue.controls['value'].setValue(playerVal.value);
  }

  updatePlayerDetails() {
    
    this.playerModelObj.firstName = this.formValue.value.firstName;
    this.playerModelObj.lastName = this.formValue.value.lastName;
    this.playerModelObj.nationality = this.formValue.value.nationality;
    this.playerModelObj.club = this.formValue.value.club;
    this.playerModelObj.position = this.formValue.value.position;
    this.playerModelObj.value = this.formValue.value.value;

    this.api.updatePlayer(this.playerModelObj, this.playerModelObj.id)
    .subscribe(res=>{
      console.log(res)
      alert("Updated successfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllPlayers();
    })
  }

  close()
  {
    this
  }

}
