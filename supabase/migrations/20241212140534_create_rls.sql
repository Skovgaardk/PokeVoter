alter table "public"."pokemon" enable row level security;

alter table "public"."votes" enable row level security;

create policy "Authenticated users can read the table"
on "public"."pokemon"
as permissive
for select
to authenticated
using (true);


create policy "Enable read access for public"
on "public"."pokemon"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."votes"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."votes"
as permissive
for select
to public
using (true);


create policy "Enable select for authenticated users only"
on "public"."votes"
as permissive
for select
to authenticated
using (true);



