import { FC, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { RecipeCreateType } from "@/types/recipe/RecipeCreateType";
import { CategoryType } from "@/types/category/CategoryType";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/api/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const CreateRecipePage: FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<z.infer<typeof CategoryType>[]>(
    []
  );
  const [selectedCategories, _] = useState(
    new Set<z.infer<typeof CategoryType>>()
  );

  const toggleCategorySelection = (category: z.infer<typeof CategoryType>) => {
    const isSelected = selectedCategories.has(category);
    if (isSelected) {
      selectedCategories.delete(category);
    } else {
      selectedCategories.add(category);
    }
  };

  const form = useForm<z.infer<typeof RecipeCreateType>>({
    resolver: zodResolver(RecipeCreateType),
    defaultValues: {
      name: "",
      preparationTime: 1,
      ingredients: "",
      description: "",
      categories: [],
    },
  });

  const create: SubmitHandler<z.infer<typeof RecipeCreateType>> = (values) => {
    console.log(values);
    api.post("/recipes", values).then((res) => {
      if (res.status === 201) {
        navigate("/");
      }
    });
  };

  const loadCategories = () => {
    api.get("/categories").then((res) => {
      if (res.status === 200) {
        setCategories([...res.data]);
      }
    });
  };

  useEffect(() => loadCategories(), []);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(create)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Provide name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preparationTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preparation time</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <Input placeholder="Provide ingredients" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {categories && (
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-2">Categories</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox">
                          Categories
                          <ChevronsUpDown />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Command>
                        <CommandInput placeholder="Select categories" />
                        <CommandEmpty>No categories found</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={category.name}
                              key={category.id}
                              onSelect={() => {
                                toggleCategorySelection(category);
                                form.setValue(
                                  "categories",
                                  Array.from(selectedCategories)
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value?.some(
                                    (cat) => cat.id === category.id
                                  )
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Provide description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add</Button>
        </form>
      </Form>
    </>
  );
};

export default CreateRecipePage;
