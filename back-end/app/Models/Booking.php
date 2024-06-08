<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Service;
use App\Models\Provider;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'provider_id',
        'service_id',
        'date',
        'time_slot',
        'price',
        'status',
    ];

    public function service() {
        return $this->belongsTo(Service::class);
    }

    public function provider() {
        return $this->belongsTo(Provider::class);
    }
}
