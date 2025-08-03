<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\StoreSetting
 *
 * @property int $id
 * @property string $key
 * @property string|null $value
 * @property string $type
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereKey($value)
 * @method static \Database\Factories\StoreSettingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class StoreSetting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'key',
        'value',
        'type',
        'description',
    ];

    /**
     * Get a setting value by key.
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    public static function get(string $key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        
        if (!$setting) {
            return $default;
        }

        return match ($setting->type) {
            'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
            'integer' => (int) $setting->value,
            'float' => (float) $setting->value,
            'array', 'json' => json_decode($setting->value, true),
            default => $setting->value,
        };
    }

    /**
     * Set a setting value by key.
     *
     * @param string $key
     * @param mixed $value
     * @param string $type
     * @return \App\Models\StoreSetting
     */
    public static function set(string $key, $value, string $type = 'string'): StoreSetting
    {
        $formattedValue = match ($type) {
            'boolean' => $value ? '1' : '0',
            'array', 'json' => json_encode($value),
            default => (string) $value,
        };

        return static::updateOrCreate(
            ['key' => $key],
            ['value' => $formattedValue, 'type' => $type]
        );
    }
}