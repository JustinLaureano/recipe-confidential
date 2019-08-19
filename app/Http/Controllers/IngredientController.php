<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function store(Request $request)
    {
        $user_id = $request->post('user_id');
        $new_ingredient = $request->post('ingredient');

        $ingredient = new Ingredient;
        $ingredient->name = $new_recipe['name'];
        $ingredient->ingredient_category_id = $new_ingredient['ingredient_category_id'];
        $ingredient->ingredient_subcategory_id = $new_ingredient['ingredient_subcategory_id'];
        $ingredient->created_user_id = $user_id;
        $ingredient->save();

        $ingredient_id = $ingredient->id;

        // return new recipe
        return response([
            'ingredient' => Ingredient::getById($ingredient_id),
            'ingredient_total' => Ingredient::where('deleted_at', Null)
                ->whereIn('created_user_id', [Null, $user_id])
                ->count()
        ], 200);
    }

    public function show(Request $request, $ingredient_id)
    {
        return response(['ingredient' => Ingredient::getById($ingredient_id)], 200);
    }

    public function update(Request $request, $ingredient_id)
    {
        $updates = [];
        $ingredient = Recipe::find($ingredient_id);
        $ingredient->name = $request->post('name');
        $ingredient->ingredient_category_id = $request->post('ingredient_category_id');
        $ingredient->ingredient_subcategory_id = $request->post('ingredient_subcategory_id');
        $ingredient->save();

        $updates[] = 'ingredient';
        $data = ['ingredient_id' => $ingredient_id, 'updates' => $updates];

        return response($data, 200);
    }

    public function destroy($id)
    {
        Ingredient::find($id)->delete();
        return response(['id' => $id], 200);
    }

    public function search(Request $request)
    {
        $user_id = $request->user_id;
        $searchValue = $request->value;

        if (!intval($user_id) && !$searchValue && !is_string($searchValue))
            return response([], 200);

        $ingredients = Ingredient::getSearchResults([
            'user_id' => $user_id, 
            'value' => $searchValue
        ]);

        return response(['ingredients' => $ingredients], 200);
    }

    public function getCountByCategory(Request $request, $user_id)
    {
        $totals = Ingredient::getCountByCategory($user_id);

        return response(['totals' => $totals], 200);
    }
}