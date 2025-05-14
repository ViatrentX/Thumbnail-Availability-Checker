import React, { useState } from 'react';
import { Button } from '/components/ui/button';
import { Input } from '/components/ui/input';
import { Label } from '/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '/components/ui/card';

export default function ThumbnailChecker() {
  const [url, setUrl] = useState('');
  const [episodeId, setEpisodeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!url) {
      newErrors.url = 'URL is required';
    } else if (!validateUrl(url)) {
      newErrors.url = 'Please enter a valid URL';
    }
    if (!episodeId) {
      newErrors.episodeId = 'Episode ID is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheck = () => {
    if (!validateInputs()) return;
    setIsLoading(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      const randomResult = Math.random() > 0.5;
      setResult({
        valid: randomResult,
        message: randomResult
          ? '✅ Thumbnail is available!'
          : '❌ Thumbnail not found for this episode',
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl">Thumbnail Checker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Website URL</Label>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className={errors.url ? 'border-red-500' : ''}
          />
          {errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="episodeId">Episode ID</Label>
          <Input
            id="episodeId"
            value={episodeId}
            onChange={(e) => setEpisodeId(e.target.value)}
            placeholder="12345"
            className={errors.episodeId ? 'border-red-500' : ''}
          />
          {errors.episodeId && (
            <p className="text-sm text-red-500">{errors.episodeId}</p>
          )}
        </div>
        <Button onClick={handleCheck} disabled={isLoading} className="w-full">
          {isLoading ? 'Checking...' : 'Check Thumbnail'}
        </Button>
        {isLoading && (
          <div className="text-center py-4">
            <p>Checking thumbnail availability...</p>
          </div>
        )}
        {result && (
          <div
            className={`p-4 rounded-lg text-center ${
              result.valid
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {result.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
