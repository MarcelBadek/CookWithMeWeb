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
import { Checkbox } from "@/components/ui/checkbox";

const CreateRecipePage: FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<z.infer<typeof CategoryType>[]>(
    []
  );
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
        <form onSubmit={form.handleSubmit(create)}>
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
              render={() => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  {categories.map((category) => (
                    <FormField
                      key={category.id}
                      control={form.control}
                      name="categories"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={category.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.some(
                                  (cat) => cat.id === category.id
                                )}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, category])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value.id !== category.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel>{category.name}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
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
          <Button type="submit" className="mt-2">
            Add
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateRecipePage;
