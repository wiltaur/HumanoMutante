import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MutantService } from '../services/mutant.service';

@Component({
  selector: 'app-mutant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mutant.component.html',
  styleUrls: ['./mutant.component.css']
})
export class MutantComponent {
  private mutantService = inject(MutantService);

  gridSize: number = 6;
  isGridCreated: boolean = false;

  dnaGrid: string[][] = [];
  nitrogenBases: string[] = ['A', 'T', 'C', 'G'];

  isMutantResult: boolean | null = null;
  mutantCells: Set<string> = new Set<string>();

  createGrid(): void {
    console.log('Generando tabla de tamaño:', this.gridSize);
    if (this.gridSize < 4) {
      alert('El tamaño mínimo de la tabla debe ser 4x4.');
      return;
    }
    this.dnaGrid = Array.from({ length: this.gridSize }, () => 
      Array(this.gridSize).fill('')
    );
    this.isGridCreated = true;
    this.resetVerification();
  }

  toggleBase(row: number, col: number): void {
    const currentBase = this.dnaGrid[row][col];
    const currentIndex = this.nitrogenBases.indexOf(currentBase);
    const nextIndex = (currentIndex + 1) % this.nitrogenBases.length;
    this.dnaGrid[row][col] = this.nitrogenBases[nextIndex];
    this.resetVerification();
  }

  isGridComplete(): boolean {
    return this.dnaGrid.every(row => row.every(cell => cell !== ''));
  }

  resetVerification(): void {
    this.isMutantResult = null;
    this.mutantCells.clear();
  }

  verifyDna(): void {
    const dnaSequence: string[] = this.dnaGrid.map(row => row.join(''));
    
    // Consumimos el servicio aquí
    const result = this.mutantService.isMutant(dnaSequence);
    
    this.isMutantResult = result.isMutant;
    this.mutantCells = result.mutantCells;
  }

  isCellMutant(row: number, col: number): boolean {
    return this.mutantCells.has(`${row}-${col}`);
  }

  restart(): void {
    this.isGridCreated = false;
    this.dnaGrid = [];
    this.resetVerification();
  }
}