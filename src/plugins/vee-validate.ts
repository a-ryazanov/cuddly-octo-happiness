import { extend } from 'vee-validate';
import { required, numeric, min_value } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'Поле обязательно для заполнения',
});

extend('numeric', {
  ...numeric,
  message: 'Поле может содержать только цифры',
});

extend('min_value', {
  ...min_value,
  message: 'Минимальное значение – {min}',
});
