import React from 'react'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Slider } from "@/components/ui/slider"


const FollowingsFilterUI = () => {

    return (
        <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Follower Range</h4>
          <p className="text-sm text-muted-foreground">
            Set the interval for follower counts.
          </p>
        </div>
        <div className="grid gap-5">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="minFollowers">Minimum</Label>
            <Input
              id="minFollowers"
              placeholder="minimum value (0)"
              className="col-span-2 h-8"
              {...registerFollowers('followers.from')}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxFollowers">Maximum</Label>
            <Input
              id="maxFollowers"
              placeholder="maximum value (?)"
              className="col-span-2 h-8"
              {...registerFollowers('followers.to')}
            />
          </div>
          <Slider defaultValue={[33]} max={100} step={1} />
          <RadioGroup defaultValue="" className="mt-3 text-slate-700 font-light">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Nano-Influencers (1k - 25k)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Micro-Influencers (25k - 100k)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Macro-Influencers (100k - 1M)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Celebrities (1M+)</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-between mt-5">
          <Button type="button" variant="outline" onClick={handleResetFollowers}>Clear</Button>
          <Button type="submit">Apply</Button>
        </div>
      </div>
    );
};

export default FollowingsFilterUI;
