import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../Models/recipe.model'; 
import { RecipesService } from '../../Services/recipes.service'; 

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    const userId = '6561f1c42f4a10cb591a758f';

    this.recipesService.getAllRecipes(userId).subscribe({
      next: (data) => {
        this.recipes = data;
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
      }
    });
  }
}
