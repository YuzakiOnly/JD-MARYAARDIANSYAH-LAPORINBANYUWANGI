<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $fillable = [
        "name"
    ];

    public function laporan(){
        return $this -> hasMany(Laporan::class);
    }
}