"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { SubscriptionSchema } from "@/validation/userSubscription";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomFormContext } from "@/components/subscription-form/SubscriptionFormContext";
import {Weekdays} from "@/const/types";

export default function DeliverySetup() {
  const form = useFormContext<z.infer<typeof SubscriptionSchema>>();
  const { selectedPlan } = useCustomFormContext();

  return (
    <div className="space-y-4">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
          </CardHeader>
          <CardContent className={"space-y-4"}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={"deliveryInformation.firstName"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"deliveryInformation.lastName"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={"deliveryInformation.address"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={"deliveryInformation.city"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"deliveryInformation.zipCode"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={"deliveryInformation.phoneNumber"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delivery Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="deliveryInformation.deliveryDays"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Preferred delivery days
                      </FormLabel>
                      <FormDescription>
                        Select your preferred delivery days.
                      </FormDescription>
                    </div>
                    {Weekdays.map((weekday) => (
                      <FormField
                        key={weekday}
                        control={form.control}
                        name="deliveryInformation.deliveryDays"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={weekday}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(weekday)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          weekday,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== weekday,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal capitalize">
                                {weekday}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryInformation.preferredDeliveryTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred delivery time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="morning">
                          Morning (8am - 12pm)
                        </SelectItem>
                        <SelectItem value="afternoon">
                          Afternoon (12pm - 5pm)
                        </SelectItem>
                        <SelectItem value="evening">
                          Evening (5pm - 9pm)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"deliveryInformation.specialDeliveryInstructions"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Delivery Instructions</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Subscription Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <strong>Plan:</strong> {selectedPlan?.name}
          </div>
          <div>
            <strong>Frequency:</strong>{" "}
            {form.watch("deliveryInformation.deliveryDays")?.join(", ")}
          </div>
          <div>
            <strong>Dietary Preferences:</strong>{" "}
            {form.watch("preferences.dietaryPreferences")?.join(", ") || "None"}
          </div>
          <div>
            <strong>Allergens:</strong>{" "}
            {form.watch("preferences.allergens")?.join(", ") || "None"}
          </div>
          <div>
            <strong>Total Monthly Cost:</strong> ${selectedPlan?.basePrice}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
