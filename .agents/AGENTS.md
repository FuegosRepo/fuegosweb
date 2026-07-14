# Reglas Críticas para Agentes de IA (AGENTS.md)

Este archivo contiene restricciones técnicas y arquitectónicas críticas para este proyecto. Cualquier agente de IA que trabaje en este repositorio debe respetar estas directivas de forma estricta para evitar fallos de seguridad o regresiones en producción.

---

## 🚨 PUNTOS CRÍTICOS NO MUTABLES (Prohibido modificar sin aprobación explícita)

### 1. Seguridad de Base de Datos (RLS en Supabase)
* **No deshabilitar RLS** en las tablas `catering_orders` ni `budgets`.
* **No modificar las políticas de exclusión** del usuario `mariage@admin.com` a menos que sea pedido explícitamente:
  * El usuario `mariage@admin.com` **solo** debe tener acceso de edición/lectura a registros donde `lower(event_type) = 'mariage'`.
  * La única excepción es en la política de lectura (`SELECT`) de `catering_orders`, que le permite leer cualquier registro en estado `'approved'` únicamente para mostrar la ocupación en el Calendario.

### 2. Inserciones Anónimas desde la Web
* Cualquier inserción en la base de datos que se haga desde la web pública (como `/catering` o el formulario de bodas) se ejecuta bajo el rol público/anónimo (`anon`).
* **Regla estricta**: Las llamadas a insertar de Supabase del lado del cliente o en API routes anónimas **nunca** deben incluir `.select()` o retornar la fila.
  * **Incorrecto**: `supabase.from('catering_orders').insert(data).select()` (Lanza error 42501 de RLS).
  * **Correcto**: `supabase.from('catering_orders').insert(data)` (Inserta sin leer, lo cual está permitido).

### 3. Sincronización de Precios (Trigger de Base de Datos)
* Existe un trigger en Supabase llamado `on_budget_upsert` que ejecuta la función `sync_order_estimated_price()`.
* Este trigger actualiza automáticamente la columna `catering_orders.estimated_price` cuando se inserta o modifica un presupuesto.
* **No intentes programar sincronizaciones manuales** en los formularios web de inserción para escribir en `estimated_price`, ya que fallará debido a las políticas de escritura restrictivas del rol público. Deja que el trigger se encargue.

### 4. Middleware de Seguridad en el Panel Admin
* El archivo `PanelAdmin/src/middleware.ts` restringe los accesos del usuario `mariage@admin.com`.
* Este usuario **únicamente** tiene permitido navegar por las rutas `/mariages`, `/calendar`, `/budgets`, `/login` y llamadas `/api`. No le des acceso a `/orders`, `/payments` ni `/reports` ya que contienen datos generales sensibles.

---

## 🛠️ Buenas Prácticas Generales del Proyecto

* **Traducciones**: El formulario de bodas es trilingüe (Francés `fr`, Inglés `en`, Español `es`). Cualquier cambio en los textos del formulario debe realizarse en `Fuegos/app/mariage/form/data/formData.ts` manteniendo los tres idiomas.
* **Resolución de Platos**: No uses mapeos estáticos para nombres de platos en el panel admin. Utiliza siempre el componente `ProductListResolver` para traducir dinámicamente tanto las bodas viejas (con IDs UUID de base de datos) como los inputs nuevos (con nombres planos de texto).
