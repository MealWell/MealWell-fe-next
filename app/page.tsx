import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  BicepsFlexed,
  Calculator,
  Clock,
  Leaf,
  Ruler,
  Scale,
  Utensils,
} from "lucide-react";
import NewsletterForm from "@/components/newsletter-form";

export default function Home() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Healthy Eating Made Simple
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Personalized meal plans tailored to your goals. Your personal
                chef and nutritionist, just a click away.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" disabled={true}>
                Get Started
              </Button>
              <Button variant="outline" size="lg" disabled={true}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted flex justify-center">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Key Features
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Utensils className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Personalized Meal Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tailored to your goals: maintenance, weight loss, or weight
                  gain
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Calorie & Nutrient Calculations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All the necessary calculations done for you
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Time-Saving</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Removes stress and saves time in meal planning
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            How It Works
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 text-xl font-bold">
                  1
                </div>
                <CardTitle>Select Your Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose between maintenance, weight loss, or weight gain
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 text-xl font-bold">
                  2
                </div>
                <CardTitle>Pick Your Favorite Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Select from a variety of delicious, healthy options
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 text-xl font-bold">
                  3
                </div>
                <CardTitle>Get Your Personalized Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive a varied and nutritious meal plan tailored just for
                  you
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted flex justify-center">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Our Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <Ruler className="mr-2 h-6 w-6" />
                    Weight Loss
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                Calorie-controlled meals to help you reach your weight loss
                goals.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <BicepsFlexed className="mr-2 h-6 w-6" />
                    Muscle Gain
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                High-protein meals designed to support muscle growth and
                recovery.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <Leaf className="mr-2 h-6 w-6" />
                    Vegetarian
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                Delicious plant-based meals for a balanced vegetarian diet.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <Scale className="mr-2 h-6 w-6" />
                    Balanced
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                Nutritionally balanced meals for overall health and wellness.
              </CardContent>
            </Card>
          </div>
          <div className="mt-10 text-center">
            <Button disabled={true}>
              View All Plans
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            What Our Users Say
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6 flex flex-col justify-between h-full">
                <p className="mb-4 text-muted-foreground">
                  &#34;As a full-time software engineer and student, this app
                  could be a game-changer for me. It would save me a tremendous
                  amount of time while helping me stay on track with a balanced
                  and healthy diet.&#34;
                </p>
                <p className="font-bold self-end">- Liviu</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex flex-col justify-between h-full">
                <p className="mb-4 text-muted-foreground">
                  &#34;This app makes it easy to enjoy a varied meal plan that’s
                  perfectly tailored to my personal needs and busy schedule.
                  &#34;
                </p>
                <p className="font-bold self-end">- Veaceslav</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex flex-col justify-between h-full">
                <p className="mb-4 text-muted-foreground">
                  &#34;The app would be perfect for my busy days—it would be so
                  convenient to have freshly prepared, nutritious meals
                  delivered right to me. The ability to customize my delivery
                  schedule would add incredible flexibility, making it easier to
                  stay on track with my health goals, even when time is
                  tight.&#34;
                </p>
                <p className="font-bold self-end">- Maria.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Simplify Your Healthy Eating?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join MealWell today and experience personalized nutrition at
                your fingertips.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" disabled={true}>
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Subscribe to Our Newsletter
          </h2>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
