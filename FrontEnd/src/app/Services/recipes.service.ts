import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../Models/recipe.model';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private apiUrl = 'http://localhost:8080/recipes'; 

  constructor(private http: HttpClient) {}

  getAllRecipes(userId: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}?userId=${userId}`);
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
