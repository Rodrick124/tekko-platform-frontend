import {
  ArrowRight,
  Bolt,
  Camera,
  Laptop,
  Refrigerator,
  Snowflake,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes.js";
import mockCategories from "../../../data/mockCategories.js";
const icons = {
  electricite: Bolt,
  climatisation: Snowflake,
  plomberie: Wrench,
  videosurveillance: Camera,
  electromenager: Refrigerator,
  informatique: Laptop,
};
const tones = {
  electricite: "bg-amber-50 text-amber-600",
  climatisation: "bg-sky-50 text-sky-600",
  plomberie: "bg-teal-50 text-teal-700",
  videosurveillance: "bg-violet-50 text-violet-700",
  electromenager: "bg-orange-50 text-orange-600",
  informatique: "bg-blue-50 text-blue-700",
};
function PopularCategoriesSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              • Domaines de dépannage
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Catégories les plus sollicitées
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            Sélectionnez un corps de métier pour afficher les professionnels
            géolocalisés immédiatement disponibles.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockCategories.map((category) => {
            const Icon = icons[category.id] || Wrench;
            return (
              <Link
                key={category.id}
                to={`${ROUTES.providers}?categorie=${category.id}`}
                className="group flex min-h-56 flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <span
                    className={`grid size-14 place-items-center rounded-2xl ${tones[category.id]}`}
                  >
                    <Icon size={28} />
                  </span>
                  <h3 className="mt-4 font-bold group-hover:text-blue-700">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {category.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-800">
                    {category.count} techniciens
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default PopularCategoriesSection;
