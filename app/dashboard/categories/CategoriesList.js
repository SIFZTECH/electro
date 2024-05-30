"use client";

import { useForm } from "react-hook-form";
import { useCategory } from "@/app/_features/categories/useCategory";

import { CiMenuKebab } from "react-icons/ci";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/app/components/ui/menubar";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";

import { TableCell, TableRow } from "@/app/components/ui/table";
import Link from "next/link";
import { updateCategory } from "@/app/_services/apiCategories";
import { useToast } from "@/app/_hooks/use-toast";
import { useRouter } from "next/navigation";

const CategoriesList = ({ category, subCategories }) => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: category.name || "" } });

  async function onSubmit(data) {
    try {
      const res = await updateCategory(category.id, data);

      if (res) {
        toast({
          variant: "success",
          title: res.message,
          duration: 1000,
        });

        router.refresh();
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast({
          variant: "destructive",
          title: err.response.data.message,
          duration: 1000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          duration: 1000,
        });
      }
    }
  }

  return (
    <TableRow>
      <TableCell>{category.id}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        {subCategories.map((item) => (
          <button
            key={item.id}
            className="btn-primary bg-transparent underline"
          >
            {item.name}
          </button>
        ))}
      </TableCell>
      <TableCell className="w-6">
        <Menubar className="bg-inherit border-none flex items-center justify-center">
          <MenubarMenu>
            <MenubarTrigger>
              <Link href={`/dashboard/categories/?id=${category.id}`}>
                <CiMenuKebab size={20} />
              </Link>
            </MenubarTrigger>

            <MenubarContent>
              <div className="flex flex-col">
                <Dialog>
                  <DialogTrigger className="hover:bg-gray-100 transition-all py-1">
                    Edit
                  </DialogTrigger>
                  <DialogContent>
                    <div>
                      <h2 className="font-serif text-lg">Edit Category</h2>
                      <p className="text-sm text-gray-800 mt-3">
                        Make changes to your category here. Click save when
                        you're done.
                      </p>
                      <form
                        className="space-y-3 mt-4"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                            Category Name
                          </label>
                          <div className="mt-2">
                            <input
                              {...register("name", {
                                required: "This filed is required",
                              })}
                              disabled={isSubmitting}
                              type="text"
                              className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                            {errors?.name && (
                              <span className="text-red-500 text-sm">
                                {errors.name.message}
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-6 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
                          >
                            {isSubmitting ? <SpinnerMini /> : "Save"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
                <MenubarSeparator />
                <Dialog>
                  <DialogTrigger className="hover:bg-gray-100 transition-all py-1">
                    Delete
                  </DialogTrigger>
                  <DialogContent>
                    <div>
                      <h2 className="font-serif text-xl">Delete Category</h2>
                      <div>
                        <p className="mt-3">
                          Are you sure you want to delete this cartegory #Name
                        </p>
                        <p className="text-sm text-gray-800 mt-3">
                          This will delete your category permanently. You cannot
                          undo this action.
                        </p>
                        <div className="flex gap-3 mt-6">
                          <button className="btn-primary bg-transparent border border-gray-900">
                            Cencel
                          </button>
                          <button className="btn-primary bg-red-500 text-white">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <MenubarSeparator />
                <Dialog>
                  <DialogTrigger className="hover:bg-gray-100 transition-all py-1">
                    Details
                  </DialogTrigger>
                  <DialogContent>Details</DialogContent>
                </Dialog>
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </TableCell>
    </TableRow>
  );
};

export default CategoriesList;
