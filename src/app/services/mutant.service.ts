import { Injectable } from '@angular/core';

export interface VerificationResult {
  isMutant: boolean;
  mutantCells: Set<string>;
}

@Injectable({
  providedIn: 'root'
})
export class MutantService {

  isMutant(dna: string[]): VerificationResult {
    const n = dna.length;
    let sequenceCount = 0;
    const tempMutantCells = new Set<string>();

    const directions = [
      { r: 0, c: 1 },
      { r: 1, c: 0 },
      { r: 1, c: 1 },
      { r: 1, c: -1 }
    ];

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const base = dna[r][c];
        if (!base) continue;

        for (const dir of directions) {
          const lastR = r + dir.r * 3;
          const lastC = c + dir.c * 3;

          if (lastR >= 0 && lastR < n && lastC >= 0 && lastC < n) {
            if (
              dna[r + dir.r][c + dir.c] === base &&
              dna[r + dir.r * 2][c + dir.c * 2] === base &&
              dna[r + dir.r * 3][c + dir.c * 3] === base
            ) {
              sequenceCount++;
              
              for (let i = 0; i < 4; i++) {
                tempMutantCells.add(`${r + dir.r * i}-${c + dir.c * i}`);
              }
            }
          }
        }
      }
    }

    const isMutantDetected = sequenceCount > 1;

    return {
      isMutant: isMutantDetected,
      mutantCells: isMutantDetected ? tempMutantCells : new Set<string>()
    };
  }
}