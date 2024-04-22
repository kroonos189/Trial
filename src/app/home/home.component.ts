import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public trains:any;
  filteredTrains :any;

  addTrainFormVisible = false;
  newTrain: any = {};
  editTrain: boolean = false;
  EditTrain: any={};
  
  constructor(private backendService: BackendService,
    ) { }

  ngOnInit(): void {
    this.getAllTrains(); 
    this.filteredTrains=this.trains;
    
  }

  searchQuery: string = '';
  

  filterData() {
    console.log(this.filteredTrains)
    if (this.searchQuery.trim() !== '') {
      this.backendService.getAllTrains().subscribe(
        (response: any) => {
          if (response && response.length > 0) {
            this.filteredTrains = response.filter((train: { trainNumber: string  }) =>
              train.trainNumber.includes(this.searchQuery) 
            );
          } else {
            this.filteredTrains = [];
          }
        },
        (error: any) => {
          console.error('Error:', error);
          this.filteredTrains = []; // Reset filtered trains on error
        }
      );
    } 
  }

  addNewTrain() {
    const substationListArray = this.newTrain.trainSubstationList.split(',');

  // Assign the array to newTrain
  this.newTrain.trainSubstationList = substationListArray;
    console.log(this.newTrain);

    this.backendService.addTrain(this.newTrain).subscribe(
      (response: any) => {
        this.addTrainFormVisible = false; // Hide form
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  
  

  getTrain(trainNumber: string): void {
    this.backendService.getTrain(trainNumber).subscribe(
      (response: any) => {
        console.log('Train:', response);
        // Handle response data
      },
      (error: any) => {
        console.error('Error:', error);
        // Handle error
      }
    );
  }

  getAllTrains(): void {
    this.backendService.getAllTrains().subscribe(
      (response: any) => {
        console.log('All Trains:', response);
        this.trains=response;
        // Handle response data
      },
      (error: any) => {
        console.error('Error:', error);
        // Handle error
      }
    );
  }

  updateTrain(train:any): void {
    this.editTrain=true;
    console.log(train)
    this.EditTrain.trainNumber=train.trainNumber
    this.EditTrain.trainName=train.trainName
    this.EditTrain.trainDepartureTime=train.trainDepartureTime
    this.EditTrain.trainDepartureStation=train.trainDepartureStation
    this.EditTrain.trainArrivalTime=train.trainArrivalTime
    this.EditTrain.trainArrivalStation=train.trainArrivalStation
    this.EditTrain.trainSubstationList=train.trainSubstationList
  }

  sendEdited(){
    console.log(this.EditTrain)
    if(typeof this.EditTrain.trainSubstationList==="string"){
      const substationListArray = this.EditTrain.trainSubstationList.split(',');
      this.EditTrain.trainSubstationList = substationListArray;
    }
    // const substationListArray = this.EditTrain.trainSubstationList.split(',');
    // this.EditTrain.trainSubstationList = substationListArray;
    this.backendService.updateTrain(this.EditTrain.trainNumber, this.EditTrain).subscribe(
      (response: any) => {
        console.log('Updated Train:', response);
        window.location.reload();
        this.editTrain=false;
        // Handle response data
      },
      (error: any) => {
        console.error('Error:', error);
        // Handle error
      }
    );
  }

  deleteTrain(trainNumber: string): void {
    this.backendService.deleteTrain(trainNumber).subscribe(
      () => {
        console.log('Train deleted successfully');
        // Handle success message
        this.filteredTrains = this.filteredTrains.filter((train: { trainNumber: string }) => train.trainNumber !== trainNumber);
        this.getAllTrains();
      },
      (error: any) => {
        console.error('Error:', error);
        // Handle error
      }
    );
  }

  allTrain(): void {
    this.backendService.getAllTrains().subscribe(
      (response: any) => {
        console.log('All Trains:', response);
        this.filteredTrains=response;
        this.searchQuery="All"
        console.log(this.filteredTrains)
        // Handle response data
      },
      (error: any) => {
        console.error('Error:', error);
        // Handle error
      }
    );
  }
}
