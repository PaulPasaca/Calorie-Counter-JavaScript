# Contador-de-Calorias usando JavaScript, HTML y CSS
# Hola, Soy cricketdev! 👋
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/paul-alexander-pasaca-1a3b2b297)
[![instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/paul_alex_p/)

Para la ejecucion de este proyecto se debe tomar en cuenta ciertos parámetros para evitar posibles errores, los cuales se describen a continuación:  

+ 👩‍💻 Primeramente inicializa la app en el archivo settings.py
```javascript
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app_juego',
]
```

+ 👩‍💻 Dentro de el mismo archivo settings.py, agregar:
```javascript
 STATIC_URL = 'static/' 
```

+ 👩‍💻 Crea tu carpeta static, la cual almacenará los archivos .js y .css

+ 👩‍💻  Verificar que se incluyan las urls dentro de la configuración principal .../Calorie_Counter/urls.py

```javascript
urlpatterns = [
    path('', include('appcaloriecounter.urls')),
    path('admin/', admin.site.urls),
]

```
+ 👩‍💻  Entrar a views.py y crear la vista que apuntará hacia nuestra pagina principal 

```javascript
def inicio(request):
  template = loader.get_template('inicio.html')
  return HttpResponse(template.render())
```

+ 👩‍💻  Configurar la url de la app usando el view anteriormente creado  

```javascript
urlpatterns = [
    path('', views.inicio, name='inicio'),
] 

```
+ 👩‍💻  En la pagina principal del html, cargar los archivos css dentro del head   

```javascript
<link rel="stylesheet" href="{% static  'css/styles.css' %}">
```

+ 👩‍💻 En la pagina principal del html, cargar los archivos js dentro de un <script>   

```javascript
    <script src="{% static '/js/script.js' %} "></script>

```
## 🚀 Tecnologías
[![JAVASCRIPT](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)]()
[![HMTL5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
[![DJANGO](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green)]()
