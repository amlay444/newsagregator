from textblob import TextBlob

def analyze_sentiment(article_text):
    """
    Analyzes the sentiment of the given article text.

    Parameters:
    article_text (str): The text of the article to analyze.

    Returns:
    dict: A dictionary containing polarity and subjectivity scores.
    """
    analysis = TextBlob(article_text)
    sentiment = {
        'polarity': analysis.sentiment.polarity,  # Ranges from -1 (negative) to 1 (positive)
        'subjectivity': analysis.sentiment.subjectivity  # Ranges from 0 (objective) to 1 (subjective)
    }
    return sentiment